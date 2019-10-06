package net.springteam.CarRenting.dao;

import net.springteam.CarRenting.model.Rental;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class RentalMapper implements RowMapper<Rental> {
    @Override
    public Rental mapRow(ResultSet resultSet, int i) throws SQLException {
        Rental rental= new Rental();
        rental.setRentalId(resultSet.getString("rentalId"));
        rental.setAdminId(resultSet.getString("adminId"));
        rental.setCustomerId(resultSet.getString("customerId"));
        rental.setBeginDate(resultSet.getDate("beginDate"));
        rental.setEndDate(resultSet.getDate("endDate"));
        rental.setTotalMoney(resultSet.getInt("totalmoney"));
        rental.setIsRent(resultSet.getInt("isRent"));
        rental.setIsPay(resultSet.getInt("isPay"));
        return rental;
    }
}
