import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const FilterModal = ({ showModal, handleCloseModal, handleLocationChange, handleGuestsChange, selectedLocation, selectedGuests, cities }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} dialogClassName="modal-100w modal-dialog-centered">
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
  );
};

export default FilterModal;
