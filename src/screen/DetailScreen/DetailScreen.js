import * as React from 'react';
import { View, Button, Text, SafeAreaView, StyleSheet, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import CommonIcon from '../../../components/CommonIcon'
const yyqx = require('../../../img/handsomeboy.jpg')
import { log } from 'react-native-reanimated';
const myavatar = require('../../../img/myAvatar.jpg')
export default class DetailScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msgList: [{ avatar: myavatar, msg:props.route&&props.route.params&&props.route.params.item.id!=3? '好啊':'不行，至少200万', isMe: true }],
            currentValue: '',
            isTyping: false
        }
    }

    componentDidMount(){
        let {msgList} = this.state
        if(this.props.route&&this.props.route.params){
            let item = this.props.route.params.item
            msgList.unshift({
                avatar:item.avatar , 
                msg: item.message, 
                isMe: false
            })
        }
        this.setState({
            msgList
        })
        console.log(this.props,'componentDidMount');
    }

    renderDialogContent = (msgList) => {
        return (
            msgList && msgList.length > 0 ? msgList.map((item, index) => {
                return (
                    item.isMe ? <View style={{ ...styles.msg, ...styles.myMsg }} key={index}>
                        <Text
                            style={styles.msgContent}
                        >{item.msg}</Text>
                        <View>
                            <Image
                                style={styles.avatar}
                                source={item.avatar}
                            />
                        </View>
                    </View> :
                        <View style={{ ...styles.msg, ...styles.otherMsg }} key={index}>
                            <View>
                                <Image
                                    style={styles.avatar}
                                    source={item.avatar}
                                />
                            </View>
                            <Text
                                style={{...styles.msgContent,marginLeft:10,backgroundColor:'#fff'}}
                            >{item.msg}</Text>
                        </View>
                )
            }) : null
        )
    }

    renderBottom = () => {
        const { currentValue, isTyping } = this.state
        return (
            <View style={styles.inputArea}>
                <View style={styles.voiceButtomContent}>
                    <CommonIcon name='icon-voice' size={26} color="#000000" />
                </View>
                <View style={styles.textInputContent}>
                    <TextInput
                        multiline
                        style={styles.TextInput}
                        editable
                        maxLength={150}
                        value={currentValue}
                        onChangeText={this.changeText}
                        onSubmitEditing={this.sendMyMsg}
                    />
                </View>
                <View style={{ ...styles.extraContent, width: isTyping && currentValue ? 110 : 80 }}>
                    <CommonIcon name='icon-emoji' size={26} color="#000000" />
                    {isTyping && currentValue ?
                        <TouchableOpacity onPress={this.sendMyMsg}>
                            <View style={styles.sendButtom}>
                                <Text style={{ color: '#fff', fontSize: 16 }}>发送</Text>
                            </View>
                        </TouchableOpacity>
                        : <CommonIcon name='icon-add' size={26} color="#000000" />}
                </View>
            </View>
        )
    }

    sendMyMsg = () => {
        const { currentValue } = this.state
        let { msgList } = this.state
        if (!currentValue) {
            return
        }
        msgList.push({ avatar: myavatar, msg: currentValue, isMe: true })
        this.setState({
            msgList,
            currentValue: '',
            isTyping: false
        })
    }

    changeText = (val) => {
        this.setState({
            currentValue: val,
            isTyping: true

        })
    }

    render() {
        return (
            <View style={styles.content}>
                <TouchableWithoutFeedback>
                    <View style={styles.dialogArea}>
                        <ScrollView>
                            {
                                this.renderDialogContent(this.state.msgList)
                            }
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
                {
                    this.renderBottom()
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: "#EDEDED",
        width: '100%',
        height: '100%',
        paddingTop: 0,
    },
    dialogArea: {
        flex: 1,
        paddingTop:10
    },
    inputArea: {
        backgroundColor: '#F5F5F5',
        minHeight: 46,
        width: '100%',
        display: "flex",
        flexDirection: 'row',
    },
    voiceButtomContent: {
        width: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    textInputContent: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    TextInput: {
        width: '100%',
        backgroundColor: "#fff",
        borderRadius: 4,
        fontSize: 16,
        minHeight: 40,
        marginTop: 8,
        marginBottom: 8
    },
    extraContent: {
        paddingRight: 10,
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center"
    },
    msg: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        // paddingTop: 10,
        paddingBottom: 14,
        backgroundColor: '#EDEDED'
    },
    myMsg: {
        justifyContent: 'flex-end',
        paddingRight: 10,
    },
    otherMsg: {
        justifyContent: 'flex-start',
    },
    msgContent: {
        maxWidth: '65%',
        fontSize: 16,
        color: '#000000',
        padding: 10,
        borderRadius: 6,
        backgroundColor: "#95EC69",
    },
    avatar: {
        marginLeft: 8,
        width: 44,
        height: 44,
        borderRadius: 10,
    },
    sendButtom: {
        width: 60,
        height: 30,
        backgroundColor: '#07C05B',
        borderRadius: 4,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
    }
});