package net.springteam.CarRenting.dao;

import net.springteam.CarRenting.model.Car;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CarMapper  implements RowMapper<Car> {
    public Car mapRow(ResultSet rs,int numRow) throws SQLException{
        Car car = new Car();
        car.setAdminID(rs.getString("adminId"));
        car.setBranch(rs.getString("branch"));
        car.setCarID(rs.getString("carID"));
        car.setCarName(rs.getString("carName"));
        car.setImage(rs.getString("image"));
        car.setCategoryId(rs.getString("categoryId"));
        car.setCategoryName(rs.getString("categoryName"));
        car.setPrice(rs.getInt("price"));
        car.setNumberSeat(rs.getInt("numberSeat"));
        return car;
    }
}
