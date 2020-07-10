/**
 * @prettier
 * @flow
 * */

import React, { Component } from "react"
import { requireNativeComponent, PixelRatio } from "react-native"

// eslint-disable-next-line no-use-before-define
const WheelPickerView = requireNativeComponent("WheelPicker", WheelPicker);

type Props = {
    onItemSelected: any => void,
    data: Array<any>,
    isCurved?: boolean,
    isCyclic?: boolean,
    isAtmospheric?: boolean,
    selectedItemTextColor?: string,
    itemSpace?: number,
    visibleItemCount?: number,
    renderIndicator?: boolean,
    indicatorColor?: string,
    indicatorSize?: number,
    isCurtain?: boolean,
    curtainColor?: string,
    itemTextColor?: string,
    itemTextSize?: number,
    itemTextFontFamily?: string,
    itemTextAlign?: 'left' | 'center' | 'right',
    selectedItemPosition?: number,
    backgroundColor?: string,
    allowFontScaling?: boolean
}

type State = { selectedItemPosition: number }

class WheelPicker extends Component<Props, State> {
    state = {
        selectedItemPosition: 0
    }

    static defaultProps = {
        style: {
            width: 200,
            height: 150
        }
    }

    onItemSelected = (event: any) => {
        if (this.props.onItemSelected) {
            this.props.onItemSelected(event.nativeEvent)
        }
    }

    componentDidMount() {
        this.setState({ selectedItemPosition: this.props.selectedItemPosition })
    }

    /*componentWillReceiveProps( nextProps: Props ) {
        this.setState( { selectedItemPosition: nextProps.selectedItemPosition } )
    }*/
    static getDerivedStateFromProps(props: Props) {
        return {
            selectedItemPosition: props.selectedItemPosition
        }
    }

    getItemTextSize = () => {
        let { allowFontScaling, itemTextSize } = this.props
        if (itemTextSize && allowFontScaling) {
            itemTextSize = PixelRatio.getFontScale() * PixelRatio.get() * itemTextSize
        }
        return itemTextSize
    }

    render() {
        const properties = {
            ...this.props,
            itemTextSize: this.getItemTextSize()
        }
        return (
            <WheelPickerView
                {...properties}
                onChange={this.onItemSelected}
                selectedItemPosition={this.state.selectedItemPosition}
            />
        )
    }
}

export default WheelPicker;
