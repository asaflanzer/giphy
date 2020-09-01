import React, { useState, useEffect, useContext } from 'react'
// packages
import { CopyToClipboard } from 'react-copy-to-clipboard';
// context
import { LoadingContext } from '../../contexts/LoadingContext';
import { QueryContext } from '../../contexts/QueryContext'
import { Loading } from '../Loading';
// mui
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

export default function Results() {
    const { loading } = useContext(LoadingContext);
    const { query, results } = useContext(QueryContext);
    const { setCopy } = useState({
        value: '',
        copied: false
    })

    useEffect(() => {}, [results]);

    const handleCopy = (e) => {
        e.preventDefault();
        setCopy({copied: true });
    }
    return (
        <div style={{margin: '10px auto'}}>
            {loading.isSuccess === false ? <div>No results found...</div>
                : (loading.status === 'loading' && <Loading />)}
            {(results || (query !== '' && loading.status === 'success')) && (
                <GridList cellHeight={160} cols={4}>
                    {results.map((gif) => {
                        return (
                            <GridListTile key={gif.images.fixed_width.mp4}>
                                <video src={gif.images.fixed_width.mp4} autoPlay loop height='100%' />
                                <CopyToClipboard text={gif.images.fixed_width.url} onCopy={(e) => handleCopy}>
                                    <GridListTileBar
                                        title={<span style={{fontSize: 10}}>{gif.title}</span>}
                                        actionIcon={
                                                <IconButton>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#fff" viewBox="0 0 24 24"><path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/></svg>
                                                </IconButton>      
                                        }
                                    />
                                </CopyToClipboard>
                            </GridListTile>
                        )
                    })}
                </GridList>
            )}
        </div>
    )
}
