import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import data from './stays.json';
import logo from './logo.svg';
import starIcon from './StarIcon.svg';
import searchIcon from './SearchIcon.svg';

const CardComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedGuests, setSelectedGuests] = useState('');
  const [filteredCards, setFilteredCards] = useState(data);
  const cities = Array.from(new Set(data.map((card) => card.city)));

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);

    const filteredData = data.filter((card) => card.city === location);
    setFilteredCards(filteredData);
  };

  const handleGuestsChange = (e) => {
    const guests = e.target.value;
    setSelectedGuests(guests);

    const filteredData = data.filter((card) => parseInt(card.maxGuests) >= parseInt(guests));
    setFilteredCards(filteredData);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <img src={logo} alt="Logo" width="100" />
          <img src={searchIcon} alt="Search Icon" width="24" className="ml-2" />
        </div>
        <Button variant="primary" onClick={handleShowModal}>
          Abrir filtro por ubicación y huéspedes
        </Button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Filtro por ubicación y huéspedes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <select
                className="form-select"
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <option value="">Todas las ubicaciones</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="Número de huéspedes"
                value={selectedGuests}
                onChange={handleGuestsChange}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>


      <div className="row">
        {filteredCards.map((card, index) => (
          <div className="col-md-4" key={index}>
            <div className="card">
              <img src={card.photo} className="card-img-top" alt={card.title} />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">City: {card.city}</p>
                <p className="card-text">Country: {card.country}</p>
               
                <div className="d-flex align-items-center">
                <img
                    src={starIcon}
                    alt="Star"
                    className="star-icon"
                    style={{ height: '1em', marginRight: '0.5'}} />
                <p className="card-text">Rating: {card.rating}</p>
                </div>
               
                <p className="card-text">Type: {card.type}</p>
                <p className="card-text">Max Guests: {card.maxGuests}</p>
                <p className="card-text">Beds: {card.beds}</p>
                {card.superHost && <p className="card-text">Superhost</p>}
              </div>
            </div>
          </div>
        ))}
         </div>
    </div>
  );
};

export default CardComponent;
