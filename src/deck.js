import React, {Component} from 'react';
import Card from "./card";
import axios from "axios";
import './card.css';
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';


class Deck extends Component{
    constructor(props) {
        super(props);
        this.state = {
            deck: null,
            drawn: []
        };
        this.getCard = this.getCard.bind(this);
    }
    async getCard() {
        let id = this.state.deck.deck_id;
        try {
            let cardUrl = `${API_BASE_URL}/${id}/draw/`;
            let cardRes = await axios.get(cardUrl);
            if (cardRes.data.remaining === 0){
                throw new Error("No card remaining!")
            }

        // console.log(cardRes.data);
        let card = cardRes.data.cards[0];
        this.setState(st => ({
            drawn: [
                ...st.drawn,
                {
                    id: card.code,
                    image: card.image,
                    name:`${card.value} ${card.suit}`
                }
            ]
        }))
        //Make request using deck id
        //Set state using new info from api
        } catch (err){
            alert(err);
        }
    }
    async componentDidMount(){
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        this.setState({deck: deck.data})
    }

    render(){
        const cards = this.state.drawn.map(c => (
            <Card name={c.name} image={c.image} />
        ));
        return (
            <div>
                <h1>Card Dealer</h1>
                <button className="btn btn-primary" type="submit" onClick={this.getCard}>Get Card!</button>
                <div className="container">{cards}</div>
            </div>
        )
    }
}
export default Deck;