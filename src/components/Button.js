import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import constants from '../res/constants'

export default (props) => {
    const { onPress, style, textStyle, isLoading, text, gradientColors, gradientStyles } = props;
    const HEIGHT = constants.window_dimensions.height
    const WIDTH = constants.window_dimensions.width
    return (
        <TouchableOpacity style={[style || { height: HEIGHT * 0.06, width: WIDTH * 0.85 }]} onPress={onPress} >
            <LinearGradient colors={ gradientColors || ['#FFFFFF', '#DADADA']} style={[gradientStyles || { flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            >
                {isLoading ?
                    <ActivityIndicator size="small" color={"#3B2A88"} /> :
                    <Text style={[textStyle || { fontSize: 20, fontWeight: "500", color: "#3B2A88" }]}>{text}</Text>}
            </LinearGradient>
        </TouchableOpacity>
    )
}