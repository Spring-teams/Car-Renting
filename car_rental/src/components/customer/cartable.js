import React from 'react';
import CarItem from './car';
import '../../css/bootstrap.min.css';

class CarTable extends React.Component {
    render() {
        const car = this.props.cars.map((car, key) => <CarItem elementCar={car} key={key} />);
        return (
            <div className="container">
                <div className="row" id="List-Car" style={{minHeight:'500px'}}>
                    {car}
                </div>
            </div>
        );
    }
}

export default CarTable;
