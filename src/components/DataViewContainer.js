import React from 'react';
import {ShotChart} from "./ShotChart";
import {CountSlider} from "./CountSlider";
import { Radio, Switch, Row, Col } from 'antd';
import _ from 'lodash';

const RadioGroup = Radio.Group;

export class DataViewContainer extends React.Component{
    state = {
        chartType : "hexbin",
        displayTooltips : true,
        minCount : 2,
    }

    /*
        1. Where is the [state] maintained?
        2. Write the [callback] func where the [state] is.
        3. Pass this [callback] down to its child as [props] who can change the state.
        4. Call the [props.callback] when needed in the child
     */

    onCountSliderChange = (minCount) => {
        this.setState({minCount});
    }

    onChartTypeChange = (e) => {
        this.setState({chartType: e.target.value});
    }

    onTooltipsChange = (displayTooltips) => {
        this.setState({displayTooltips});
    }

    render() {
        const {minCount, chartType, displayTooltips} = this.state;

        return (
            <div className={"data-view"}>
                <ShotChart
                    playerId={this.props.playerId}
                    minCount={minCount}
                    displayTooltips={displayTooltips}
                    chartType={chartType}
                />
                {
                    chartType === 'hexbin' ? <CountSlider
                        value={minCount}
                        onChange={_.debounce(this.onCountSliderChange, 500)}
                    /> : null
                }
                <Row>
                    <Col span={8} offset={7}>
                        <RadioGroup onChange={this.onChartTypeChange} value={chartType}>
                            <Radio value={"hexbin"}>Hexbin</Radio>
                            <Radio value={"scatter"}>Scatter</Radio>
                        </RadioGroup>
                    </Col>
                    <Col span={2}>
                        <Switch
                            checkedChildren="On"
                            unCheckedChildren="Off"
                            defaultChecked onChange={this.onTooltipsChange}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}