import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import FilterModal from './FilterModal';
import data from '../data/stays.json';
import logo from '../resources/Icons/logo.svg';
import starIcon from '../resources/Icons/StarIcon.svg';
import searchIcon from '../resources/Icons/SearchIcon.svg';

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

      <FilterModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleLocationChange={handleLocationChange}
        handleGuestsChange={handleGuestsChange}
        selectedLocation={selectedLocation}
        selectedGuests={selectedGuests}
        cities={cities}
      />

      <div className="row">
        {filteredCards.map((card, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-240px w-100">
              <img src={card.photo} className="card-img-top img-fluid" alt={card.title} />
              <div className="card-body">
                <div className="d-flex align-items-center mb-2">
                  {card.superHost && <p className="card-text text-primary">Superhost</p>}
                  <p className="card-text">{card.type}</p>
                  <p className="card-text">Beds: {card.beds}</p>
                  <img
                    src={starIcon}
                    alt="Star"
                    className="star-icon"
                    style={{ height: '1em', marginRight: '0.5em' }}
                  />
                  <p className="card-text">{card.rating}</p>
                </div>
                <h6 className="card-title">{card.title}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComponent;
