package net.springteam.CarRenting.dao;

import net.springteam.CarRenting.model.Rental;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

public class RentalDao {
    private DataSource dataSource;
    private JdbcTemplate template;
    public RentalDao(DataSource ds){
        this.dataSource=ds;
        this.template=new JdbcTemplate(this.dataSource);
    }
    public void addRental(Rental rental){
        String SQL="insert into rental (rentalId,customerId,adminId,beginDate,endDate,totalMoney,isRent,ispay)" +
                " values(?,?,?,?,?,?,?,?)";
        this.template.update(SQL,rental.getRentalId(),rental.getCustomerId(),rental.getAdminId(),rental.getBeginDate(),rental.getEndDate(),rental.getTotalMoney(),rental.getIsRent(),rental.getIsPay());
    }
}
