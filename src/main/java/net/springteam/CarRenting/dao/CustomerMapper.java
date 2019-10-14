package net.springteam.CarRenting.dao;

import net.springteam.CarRenting.model.Customer;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CustomerMapper implements RowMapper<Customer> {
    @Override
    public Customer mapRow(ResultSet resultSet, int i) throws SQLException {
        Customer customer = new Customer();
        customer.setCustomerId(resultSet.getString("customerId"));
        customer.setName(resultSet.getString("name"));
        customer.setPhone(resultSet.getString("phone"));
        customer.setBirthday(resultSet.getDate("birthday"));
        customer.setGender(resultSet.getString("gender"));
        customer.setCompanyName(resultSet.getString("companyName"));
        customer.setEmail(resultSet.getString("email"));
        customer.setPass(resultSet.getString("pass"));
        return customer;
    }
}
