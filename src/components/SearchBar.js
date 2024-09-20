import React from 'react';
import { PROFILE_PIC_URL_PREFIX } from '../constants';
import { AutoComplete, Input, Icon } from 'antd';
import nba from 'nba';

const Option = AutoComplete.Option;

export class SearchBar extends React.Component {
    state = {
        dataSource: [],
    }

    onSelect = (playerName) => {
        this.props.loadPlayerInfo(playerName);
    }

    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : nba.searchPlayers(value).map(
                ({fullName, playerId}) =>
                    <Option key={playerId} value={fullName}>
                        <img
                            className="player-option-pic"
                            src={`${PROFILE_PIC_URL_PREFIX}/${playerId}.png`}
                            alt="Profile"
                        />
                        <span className="player-option-label">{fullName}</span>
                    </Option>
            ),
        });
    }

    render() {
        const { dataSource } = this.state;
        return (
                <AutoComplete
                    className="search-bar"
                    size="large"
                    dataSource={dataSource}
                    onSelect={this.onSelect}
                    onSearch={this.handleSearch}
                    placeholder="Search NBA Player"
                    optionLabelProp="value"
                >
                    <Input suffix={<Icon type="search" />} />
                </AutoComplete>
        );
    }
}