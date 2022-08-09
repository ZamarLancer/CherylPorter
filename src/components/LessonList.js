import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { initColors } from '../res/colors'
import constants from '../res/constants'
import FontFamily from '../res/FontFamily'
import { SvgXml } from 'react-native-svg'
import svgs from '../assets/svgs'
import NavigationService from '../navigation/NavigationService'
import ROUTES from '../navigation/ROUTES'

export default (props) => {
    const colors = initColors
    const HEIGHT = constants.window_dimensions.height
    const WIDTH = constants.window_dimensions.width
    const styles = buttonRowStyles(colors, WIDTH, HEIGHT)
    const [rowList, setRowList] = useState(props.data);
    React.useEffect(() => {
        setRowList(props.data);
    }, [props.data])
    return (
        <View style={styles.buttonRow}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }} >

                {rowList.map((item, index) => {
                    const isSelected = item?.isSelected ?? false;
                    return (
                        <TouchableOpacity key={`${index} in rowList`} style={[styles.buttonBackground, {
                            backgroundColor: props.pressed === 0 ? colors.primary : props.pressed === 1 ? colors.secondary : colors.yellowish,
                            borderWidth: isSelected ? 1 : 0,
                            borderColor: isSelected ? colors.primary : colors.white
                        }]}
                            onPress={() => {
                                NavigationService.NavigationActions.common_actions.navigate(ROUTES.APP_ROUTES.LessonDetails.screen_name, { ...item, index: props.pressed })
                            }}>
                            <View style={{ flexDirection: 'column', width: 300, paddingLeft: 20 }} >
                                <Text numberOfLines={1} style={[styles.buttonText, {
                                    color: props.pressed === 2 ? colors.black :  colors.white,
                                    fontFamily: FontFamily.Poppins.Bold
                                }]}>{item.Name}</Text>
                                <Text numberOfLines={1} style={[styles.buttonText, {
                                    color: props.pressed === 2 ? colors.black : colors.white,
                                    fontSize: 13
                                }]} >{item.Description}</Text>
                            </View>
                            <View style={{ flexDirection: 'column', width: 50 }} >
                                <SvgXml xml={svgs.playIcon(props.pressed === 2 ? colors.black : colors.white)} />
                            </View>
                        </TouchableOpacity>
                    )
                })
                }
            </ScrollView>

        </View>
    )
}
const buttonRowStyles = (colors = initColors, width, height) => StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    buttonRow: {
        marginHorizontal: 10,
        // marginVertical: 5,
    },
    buttonBackground: {
        backgroundColor: '#EB39A2',
        justifyContent: "space-evenly",
        alignItems: 'center',
        width: 350,
        // height: 70,
        padding: 5,
        borderRadius: 40,
        marginVertical: 5,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    buttonText: {
        fontFamily: FontFamily.Poppins.Light,
        fontSize: 15,
        color: colors.white
    }

})