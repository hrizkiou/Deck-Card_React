import React, {Component} from 'react';
import './card.css';
class Card extends Component{
    constructor(props) {
        super(props);

        let x = Math.random() * 40 - 20;
        let y = Math.random() * 40 - 20;
        let angle = Math.random()  * 90 - 45;
        this._transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;

    }
    render(){
        console.log(this._transform);
        return (
            <img className='Card' style={{transform: this._transform}} src={this.props.image} alt={this.props.name} />
            )
    }
}export default Card;
