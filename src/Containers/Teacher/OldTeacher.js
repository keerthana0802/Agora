import React from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import '../../App.css';
import './Styles/TeacherSyles.css'
import RemoteStream from '../../Components/RemoteStream';

import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import AgoraRTM from 'agora-rtm-sdk';
import ChatCard from '../../Components/Chat'
import ClassNames from 'classnames'

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localStreamInitiated: false,
      remoteStreams: {

      },
      localVideo: true,
      localAudio: true,
      videoPublished: false,
      audioPublished: false,
      rtmLoggedIn: false,
      rtmChannelJoined: false,
      uid: "",
      tuteAVControls: {
        audio: true,
        video: true
      },
      isTute: true,
      selectedProfile: '240p_1',
      networkQuality: 2,

      tuteControls: {

      },
      speakers: [],

    }


    this.videoTrack = null
    this.audioTrack = null;
    this.RTMChannel = null;
    this.RTCClient = null;
    this.RTMClient = null;

    this.channel = "web_share";
    this.localVideoView = React.createRef();
    this.appId = "a5431333004841fea39dc13668e92113";


    this.rtm = {
      params: {
      }
    }
  }




  componentDidMount() {
    this.initRTM();
    this.initLocalStream();
    this.onDeviceChange();
    this.initClient();
  }

  initRTM = () => {
    this.RTMClient = AgoraRTM.createInstance(this.appId);
    this.subscribeClientEvents();
  }


  getChannelCount = () => {
    this.RTMClient.getChannelMemberCount([this.channel]).then(res => {
      console.log(" =>> getChannelMemberCount", res);
    }).catch(error => {
      console.log(" =>> failed to get getChannelMemberCount", error)
    })

    // this.RTMChannel.getMembers().then(res => {
    //   console.log(" =>> member count", res);
    // }).catch(error => {
    //   console.log(" =>> failed to get member count", error)
    // })
  }

  // getUserAttr = () => {
  //   this.RTMClient.getUserAttributes("kj123").then(res => {
  //     console.log(" =>> user Attr ", res);
  //   }).catch(error => {
  //     console.log(" =>> failed to get user Attr", error)
  //   })
  // }

  // disableMe = () => {
  //   this.RTMClient.setLocalUserAttributes({ "videoState": "off" }).then(res => {
  //     console.log(" =>> set user Attr done", res);
  //   }).catch(error => {
  //     console.log(" =>> failed to set user Attr", error)
  //   })
  // }




  loginToRTM = async () => {
    if (this.state.uid === "") {
      alert("please enter username");
      return;
    }
    await this.RTMClient.login({ uid: this.state.uid, token: null }).then((res) => {
      console.log(" =>> RTM Loggin successfull!");
      this.RTMChannel = this.RTMClient.createChannel(this.channel);

      this.setState({ rtmLoggedIn: true });
      this.getAVStates();
      this.joinSessionChannel();
    }).catch(error => {
      console.log(" =>> failed to login RTM", error)
    })

    
  }

  getAVStates = async () => {
    this.RTMClient.getChannelAttributes(this.channel).then(attr => {
      console.log("=>> channel attrs", attr)
      let tuteControls = attr.av ? JSON.parse(attr.av.value) : {};
      console.log("=>> controls tute", tuteControls);
      this.checkForInitialMute(tuteControls);
      this.setState({ tuteControls });
    }).catch(error => {
      console.log("failed to get channel attrs", error);
    })
  }

  checkForInitialMute = (tuteControls) => {
    let ctrl = tuteControls[this.state.uid] || null;
    let tuteAVControls = { ...this.state.tuteAVControls }
    if (ctrl) {
      console.log("attr ", ctrl, !tuteAVControls.audio, !tuteAVControls.video);
      if (!ctrl.audio) {
        this.muteUser('audio')
        tuteAVControls.audio = false;
      }
      if (!ctrl.video) {
        this.muteUser('video')
        tuteAVControls.video = false;
      }
      this.setState({ tuteAVControls })
    }
  }

  joinSessionChannel = async () => {

    this.RTMChannel.join().then(res => {
      console.log(" =>> Channel joined successfull!", res);
      this.joinChannel();
      this.setState({ rtmChannelJoined: true })

    }).catch(error => {
      console.log(" =>> Error joining channel", error);
    })
  }

  subscribeChannelEvents = () => {
    this.RTMChannel.on('ChannelMessage', ({text}, memberId) => {
      console.log("ChannelMessage =>>", text, memberId)
      let json = JSON.parse(text);
      if (json.type === 'chat') {
        this.chatRef.onEvents(json)
      } else if(json.type === 'pin') {
        let userId = json.user_id
        let remoteStreams = this.state.remoteStreams
        if(remoteStreams[userId]) {
          remoteStreams[userId].pin = json.value
          this.setState({remoteStreams})
        }
      }
    })
    this.RTMChannel.on('MemberJoined', (memberId) => {
      console.log("MemberJoined =>>", memberId)
    })
    this.RTMChannel.on('MemberLeft', memberId => {
      console.log("MemberLeft =>>", memberId)
    });

    this.RTMChannel.on('AttributesUpdated', attributes => {
      console.log("AttributesUpdated =>>", attributes);
    })

  }



  subscribeClientEvents = () => {
    this.RTMClient.on('ConnectionStateChanged', (event) => {
      console.log("ConnectionStateChanged =>>", event)
    })
    this.RTMClient.on('MessageFromPeer', (message, peerId) => {
      console.log("MessageFromPeer =>>", message, peerId)
      let data = JSON.parse(message.text);
      console.log("=>> msg", data);
      if (data.value === false) {
        this.muteUser(data.type);
      }
      let tuteAVControls = { ...this.state.tuteAVControls };
      tuteAVControls[data.type] = data.value;
      this.setState({ tuteAVControls })

    })
  }

  muteUser = (type) => {
    if (type === 'audio') {
      if (this.state.localAudio) {
        this.audioTrack.setEnabled(false);
        this.setState({ localAudio: false });
      }
    } else if (type === 'video') {
      if (this.state.localVideo) {
        this.videoTrack.setEnabled(false);
        this.setState({ localVideo: false });
      }
    }
  }

  initLocalStream = async () => {
    try {
      // [this.audioTrack, this.videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      this.videoTrack = await AgoraRTC.createCameraVideoTrack({ encoderConfig: this.state.selectedProfile });
      this.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  
      // this.videoTrack.setOptimizationMode("motion");
      this.videoTrack.play(this.localVideoView.current);
    } catch (error) {
      alert("please check the permission for audio/camera")
      console.log("Weeoe", error)
    }
  }

  onDeviceChange = () => {
    AgoraRTC.onMicrophoneChanged = this.onMicrophoneChanged;
    // AgoraRTC.onCameraChanged = this.onPlaybackDeviceChange;
  }

  onCameraChanged = (info) => {
    console.log("camera changed!", info.state, info.device);
  }


  onMicrophoneChanged = async (info) => {
    console.log("LLL  newdevice", info);
    try {
      AgoraRTC.getDevices()
        .then(async devices => {
          const audioDevices = devices.filter(function (device) {
            return device.kind === "audioinput";
          });
          console.log(audioDevices);
          if (audioDevices.length > 0) {
            let newAudioDevice = await AgoraRTC.createMicrophoneAudioTrack(audioDevices[0].deviceId);
            if (this.state.audioPublished) {
              await this.RTCClient.unpublish(this.audioTrack);
              if (this.state.localAudio) {
                this.publishTrack(newAudioDevice);
              } else {
                this.setState({ audioPublished: false });
              }
            }
            this.audioTrack = newAudioDevice;

          }
        })
    } catch (error) {
      console.log("Error on get device,", error);
    }
  }


  publishTrack = (track) => {
    this.RTCClient.publish(track).then(res => {
      if (track.trackMediaType === 'audio') {
        this.setState({ audioPublished: true })
      } else if (track.trackMediaType === 'video') {
        this.setState({ videoPublished: true })
      }
    }).catch(error => {
      console.log("Failed to published track :" + track.trackMediaType, track.trackMediaType, error);
    })
  }

  unpublishTrack = async (track) => {
    this.RTCClient.unpublish(track).then(() => {
      console.log("unpublishTrack =>> :track unpublished", track);
    }).catch(error => {
      console.log("unpublishTrack =>> : failed to unpublish track", error);
    })
  }


  initClient = () => {
    this.RTCClient = AgoraRTC.createClient({
      mode: 'rtc',
      codec: 'vp8'
    })
    this.screenClient = AgoraRTC.createClient({
      mode: 'rtc',
      codec: 'vp8'
    })
    this.subscribeEvents();
  }

  subscribeEvents = () => {
    this.RTCClient.on('user-published', this.userPublished);
    this.RTCClient.on('user-unpublished', this.userUnPublished);
    this.RTCClient.on('stream-subscribed', (evt) => {
      console.log('stream-subscribed', evt)
    })
     this.RTCClient.on('stopScreenSharing', ()=> {
      this.screenTrack.stop();
      this.screenTrack.close();
    })
    this.RTCClient.on('user-left', this.userLeft);
    this.RTCClient.on('user-joined', this.userJoined);
    this.RTCClient.enableAudioVolumeIndicator();
    this.RTCClient.on('volume-indicator', this.volumeIndicator)
    this.RTCClient.on('network-quality', this.networkQuality);
  }

  networkQuality = (stats) => {
    // console.log("=>> downlinkNetworkQuality", stats.downlinkNetworkQuality);
    // console.log("=>> uplinkNetworkQuality", stats.uplinkNetworkQuality);
    let networkQuality = this.state.networkQuality;
    let newNetworkQuality = stats.uplinkNetworkQuality;
    if (newNetworkQuality > 0 && networkQuality !== newNetworkQuality) {
      if (newNetworkQuality === 1) {
        this.setVideoProfile('240p_1');
      } else if (newNetworkQuality === 2) {
        this.setVideoProfile('180p_1');
      } else if (newNetworkQuality === 3 || newNetworkQuality === 4 || newNetworkQuality === 5) {
        this.setVideoProfile('120p_1');
      }
      this.setState({ networkQuality: newNetworkQuality })
    }
    // let rcstats = this.RTCClient.getRTCStats();
    // console.log("=>> RC Stats", rcstats)
  }


  setVideoProfile = async (profile) => {
    await this.videoTrack.setEncoderConfiguration(profile).then(() => {
      console.log(" =>> Video profile updated : ", profile)
      this.setState({ selectedProfile: profile });
    })
  }

  volumeIndicator = async (volumes) => {
    volumes.forEach((volume, index) => {
      // console.log(` =>> ${index} UID ${volume.uid} Level ${volume.level}`);
      if (volume.level >= 5) {
        this.updateSpeaker(volume.uid);
      }
    });
  }

  updateSpeaker = (uid) => {
    let suid = uid;
    let speakers = [...this.state.speakers];
    speakers.push(suid);
    this.setState({ speakers }, () => this.removeSpeaker(suid));
  }

  removeSpeaker = (suid) => {
    setTimeout(() => {
      console.log("=>> cleared speaker", suid)
      let speakers = [...this.state.speakers];
      const index = speakers.indexOf(suid);
      if (index > -1) {
        speakers.splice(index, 1);
      }
      this.setState({ speakers });
    }, 2000);
  }

  userLeft = (user, reason) => {
    console.log(" =>> userLeft Reason", reason);
    let remoteStreams = { ...this.state.remoteStreams };
    delete remoteStreams[user.uid];
    this.setState({ remoteStreams });
  }

  userJoined = (user) => {
    let remoteStreams = { ...this.state.remoteStreams };
    let tuteControls = { ...this.state.tuteControls };
    remoteStreams[user.uid] = {
      uid: user.uid,
      videoState: false,
      audioState: false,
      pin: false
    };

    if (!tuteControls[user.uid]) {
      tuteControls[user.uid] = {
        audio: true,
        video: true
      }
    }
    this.setState({
      remoteStreams,
      tuteControls
    })
  }

  userPublished = async (user, mediaType) => {
    console.log("userPublished =>>>> ", mediaType, user.uid);
    await this.RTCClient.subscribe(user, mediaType);
    await this.RTCClient.setRemoteVideoStreamType(user.uid, 0)
    await this.RTCClient.setStreamFallbackOption(user.uid, 2)
    let remoteStreams = { ...this.state.remoteStreams };
    let uid = user.uid;
    if (mediaType === "video" && user.videoTrack) {
      user.videoTrack.play(uid + "");
      remoteStreams[uid].videoState = true;
    }
    else if (mediaType === "audio" && user.audioTrack ) {
      user.audioTrack.play();
      remoteStreams[uid].audioState = true;
    }
    this.setState({ remoteStreams });

  }

  userUnPublished = async (user, mediaType) => {
    console.log("userUnPublished =>>>> ", mediaType, user.uid);
    await this.RTCClient.unsubscribe(user, mediaType);
    let uid = user.uid;
    let remoteStreams = { ...this.state.remoteStreams };
    if (remoteStreams[uid]) {
      if (mediaType === "video") {
        remoteStreams[uid].videoState = false;
      }
      else if (mediaType === "audio") {
        remoteStreams[uid].audioState = false;
      }
      this.setState({ remoteStreams });
    }
  }

  joinChannel = () => {
    if (this.RTCClient !== null) {
      this.RTCClient.join(this.appId, this.channel, null, this.state.uid).then(uid => {
        this.rtm.params.uid = uid;
        this.subscribeChannelEvents()
        this.RTCClient.enableDualStream().then(() => {
          console.log("Enable Dual stream success!");
        }).catch(err => {
          console.log(err);
        })

        if (this.state.localVideo) {
          this.publishTrack(this.videoTrack);
        }
        if (this.state.localAudio) {
          this.publishTrack(this.audioTrack);
        }
      }).catch(error => {
       console.log("failed to join channel ", error);
      })
    }
  }

  toggleTrack = async (track) => {


    if (track === 'video') {
      if (this.state.localVideo) {
        await this.videoTrack.setEnabled(false);
      } else {
        await this.videoTrack.setEnabled(true);

        if (!this.state.videoPublished) {
          this.publishTrack(this.videoTrack);
        }
      }
      this.setState({ localVideo: !this.state.localVideo })

    } else if (track === 'audio') {
      if (this.state.localAudio) {
        await this.audioTrack.setEnabled(false);
      } else {
        await this.audioTrack.setEnabled(true);
        if (!this.state.audioPublished) {
          this.publishTrack(this.audioTrack);
        }

      }
      this.setState({ localAudio: !this.state.localAudio });
    }

  }
  onAVChange = (id, type, value) => {
    let tuteControls = { ...this.state.tuteControls }
    let ctrl = tuteControls[id] ? { ...tuteControls[id] } : {};
    ctrl[type] = !value;
    tuteControls[id] = ctrl;
    let text = JSON.stringify({ type, value: !value });
    if(type === 'pin') {
      this.sendMessage({
        type: 'pin',
        value: false,
        student_user_id: id
      })
      tuteControls[id][type] = false
      let remoteStreams = this.state.remoteStreams
      if(remoteStreams[id]) {
        remoteStreams[id].pin = false
        this.setState({remoteStreams})
      }
      this.setState({ tuteControls });
      return
    }
    //this.RTMClient.addOrUpdateChannelAttributes(this.channel, { 'av': JSON.stringify(tuteControls) }).then(res => {
    //  console.log(" =>> AV updated successfully!");
    
    this.RTMClient.sendMessageToPeer(
      { text }, id.toString())
    .then(result => {
      console.log("sendResult =>>", result);
      if (result.hasPeerReceived) {
        this.setState({ tuteControls });
      }
    }).catch(error => {
      console.log("failed to send peer meg", error);
    })
  }

  getChannelAttr = () => {
    this.RTMClient.getChannelAttributes(this.channel).then(attr => {
      console.log("=>> channel attrs", attr)
    }).catch(error => {
      console.log("failed to get channel attrs", error);
    })
  }


  leaveChannel = () => {
    this.RTMChannel.leave().then(() => {
      console.log("Logged out from channel");
      this.RTMClient.logout().then(() => {
        console.log("Logged out from Agora");
        this.RTCClient.leave();
        this.setState({ rtmChannelJoined: false, rtmLoggedIn: false })
      }).catch(error => {
        console.log("=>> Error on Logging out from channel", error);
      })
    }).catch(error => {
      console.log("=>> Error on leaving channel ", error);
    })
  }
  handleShow = slideid => {
     if(this.state.activeSlideId) {
      slideid = null
    }
    this.onSlideChange(slideid)
  }
  toggleProfile = (event) => {
    let value = event.target.value;
    this.setVideoProfile(value);
  }

  setUuid = () => {
    return Math.random().toString(16).slice(2)
  }

  sendMessage = (msg, streamId ) => {
    if(!msg) return 
    let userId = this.state.uid
    let lastMessageId = this.setUuid()
    let todayDate = new Date()
    todayDate = todayDate.getTime()
    let data = JSON.stringify({received_at: todayDate, ...msg, user_id:userId , user_type: 'teacher', id : lastMessageId, class_room_id:this.channel})
    this.sendChannelMessage(data)
  }

  sendChannelMessage = (data) => {
    this.RTMChannel && this.RTMChannel.sendMessage({text: data}).then(() => {
      console.log('Success sending message', data)
    }).catch(error => {
      console.log('Failed sending message:', error)
    });
  }

  onSlideChange = (slideid=1) => {
    let that = this
    this.RTMClient.addOrUpdateChannelAttributes(this.channel, { 'activeSlideId': `${slideid}` }).then(res => {
      console.log(" =>> activeSlideId updated successfully!");
      let text = JSON.stringify({ type:'slide', slideid  });
      //sendMessage({text: data}).then(() => {
      that.RTMChannel.sendMessage(
        { text })
        .then(result => {
          that.setState({activeSlideId: slideid})
          console.log("send Message =>>", result);
        }).catch(error => {
          console.log("failed to send peer meg", error);
        })
    })
  }

   initLocalScreenStream = async () => {
    if(this.RTCClient) {
      this.shareClient = AgoraRTC.createClient({ mode:'rtc',  codec: 'vp8'});
      this.shareClient.join(this.appId,this.channel, null, `${this.state.uid}-shareScreen`).then(uid => {
      AgoraRTC.createScreenVideoTrack({encoderConfig: "1080p_1"}
        ).then(localScreenTrack => {
          // localScreenTrack.play('local_stream')
          this.shareClient.publish(localScreenTrack).then(res => {
           console.log(res)
          }).catch(err => {
            console.log(err)
          })
          localScreenTrack.on('track-ended', () => {
            localScreenTrack.close();
            this.shareClient.leave()
          })
        })
         
      }).catch(err => {
        console.log(err);
      })
    }
    }

  sharingScreen = (e) => {
   this.initLocalScreenStream()
  };

  
  render() {
    const { remoteStreams, rtmLoggedIn, rtmChannelJoined, tuteControls, speakers } = this.state;
    // console.log("streams =>>", remoteStreams);
    // console.log("Speaker =>>", speakers);
    let slides = [{
      id: 1, image: 'http://passyworldofmathematics.com/Images/pwmImagesFour/PythagGuitarDiag1250wideJPG.jpg'},
      {id: 2, image: 'https://i.pinimg.com/564x/0e/99/e3/0e99e301ab31095fbed0f737f40870df.jpg'},
      {id: 3, image: 'https://techreviewpro-techreviewpro.netdna-ssl.com/wp-content/uploads/2017/12/Yousician-Guitar-learning-app-Android.jpg'},
      {id:  4, image: 'https://techreviewpro-techreviewpro.netdna-ssl.com/wp-content/uploads/2017/12/Guitar-Plus.png'}]

    return (
      <div className="teacher-container">
        {rtmChannelJoined && <div className='header'>
          <button className="btn-card" onClick={this.sharingScreen}>
              Share Screen
            </button>
           <button className='btn-card' onClick={() => this.handleShow(1)}>
            {this.state.activeSlideId ? 'End Slides': 'Slides Show' }
          </button>
          <button className="btn-card" onClick={this.leaveChannel}>End Session</button>
        </div>}
        <div className='main-container'>
        <div className="localStreamContainer">
          <input className="input" value={this.state.uid} onChange={(e) => this.setState({ uid: e.target.value })} placeholder="enter user name" />
          <div className="remoteStreamItem">
                <div className={"remoteStream"} id="localView" ref={this.localVideoView} />
                <div className="controlsGroup">
                  <div className={ClassNames("controlIcon", 'cursor')} onClick={() => this.toggleTrack("video")}>{this.state.localVideo ? <VideocamIcon fontSize="large" /> : <VideocamOffIcon fontSize="large" />}</div>
                  <div className={ClassNames("controlIcon", 'cursor')} onClick={() => this.toggleTrack("audio")}>{this.state.localAudio ? <MicIcon fontSize="large" /> : <MicOffIcon fontSize="large" />}</div>
               </div>
              </div>
          {!rtmLoggedIn && <button className="join" onClick={this.loginToRTM}>Join</button>}
          
       </div>
        <div className="rightContainer">
          <div className="remoteStreamContainer">
            {Object.keys(remoteStreams).map((item, index) => <RemoteStream speaking={speakers.indexOf(item) > -1} key={item} isTute={this.state.isTute} onAVChange={this.onAVChange} tuteControls={tuteControls[item]} stream={remoteStreams[item]} id={item} />)}
          </div>
        </div>
        <div id='local_stream' style={{width: '100px', height: '200px'}}/>
        
        {rtmLoggedIn && this.state.activeSlideId && <div className ='slides-container'>
          <div className='slide-img' style={{backgroundImage: `url(${slides[this.state.activeSlideId-1].image})`}} />
          <div className='btn-next-prev'>
            <button disabled={this.state.activeSlideId === 1} onClick={() => this.onSlideChange(this.state.activeSlideId-1)}> {'<'} </button>
            <button disabled={slides.length === this.state.activeSlideId} onClick={() => this.onSlideChange(this.state.activeSlideId+1)}> {'>'}</button>
            </div>
        </div>}
        {rtmLoggedIn && <div className='chatBox'><ChatCard 
          onRef={ref => (this.chatRef = ref)}
          sendMessage = {this.sendMessage}
          name={this.state.uid}
          userId={this.state.uid}
        /></div>}
        </div>
      </div>
    );
  }
}

export default Teacher;
