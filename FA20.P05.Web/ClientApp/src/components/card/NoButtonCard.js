import React from "react";
import { Card } from "react-bootstrap";
import {Link} from 'react-router-dom';
import "./card.css";



function NoButtoncard(props) {
    return(
        <div className="solocard">
        <Link to={props.link} style={{textDecoration:'none'}}>
        <Card border="dark" className="card">
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text style={{backgroundColor:"black"}}>
              <h4>{props.number}</h4>
            </Card.Text>
          </Card.Body>
        </Card>
        </Link>
        </div>
    );
}

export default NoButtoncard;