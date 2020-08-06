import React, { ReactEventHandler } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';


interface HeaderProps {
}

interface HeaderState {
    searchInput: string;
    searchedSongs: any[];
}

class Home extends React.Component<HeaderProps, HeaderState> {

    state: HeaderState = {
        searchInput: '',
        searchedSongs: []
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ searchInput: e.target.value })

    handleSubmit = (e: any) => {
        e.preventDefault();

        let headers = new Headers({
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "4013e328ffmsh3feb54311ce7296p1c3cc4jsnd3ad09e0821d",
        });
        fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + this.state.searchInput,
            {
                method: "GET",
                headers,
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((artists) => {
                let songs = artists.data;
                this.setState({ searchedSongs: songs })
                console.log(this.state.searchedSongs)
                this.setState({ searchInput: '' })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    render() {
        return (
            <>
                <Form className="form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="text"
                        value={this.state.searchInput}
                        placeholder="Search..."
                        onChange={this.handleChange}
                    />
                    <input
                        type="submit"
                        value="search"
                        className="btn btn-dark btn-block"
                    />
                </Form>
                <Row sm={3}>
                    {this.state.searchedSongs.map((song, i) => {

                        return (<>
                            <Col className="mb-2" key={i}>
                                <img
                                    className="img-fluid"
                                    src={song.album.cover_medium}
                                    alt="song"
                                />
                                <p>
                                    Album: {song.album.title_short}
                                    <br />
                                    Artist: {song.artist.name}
                                </p>
                            </Col>
                        </>
                        )
                    }
                    )}
                </Row>
            </>
        )
    }
}

export default Home