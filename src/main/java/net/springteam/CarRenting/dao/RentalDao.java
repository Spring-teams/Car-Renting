package net.springteam.CarRenting.dao;

import net.springteam.CarRenting.model.Rental;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import java.util.List;

public class RentalDao {
    private DataSource dataSource;
    private JdbcTemplate template;
    public RentalDao(DataSource ds){
        this.dataSource=ds;
        this.template=new JdbcTemplate(this.dataSource);
    }
    public void addRental(Rental rental){
        String SQL="insert into rental (customerId,ownerId,beginDate,endDate,totalMoney,isRent,ispay,carId,isConfirm)" +
                " values(?,?,?,?,?,?,?,?,?)";
        this.template.update(SQL,rental.getCustomerId(),rental.getOwnerId(),rental.getBeginDate(),rental.getEndDate(),rental.getTotalMoney(),rental.getIsRent(),rental.getIsPay(),rental.getCarId(),rental.getConfirm());
    }
    public List<Rental> getRentalByCustomerId(String customerId){
        String SQL="select * from rental inner join owner on rental.ownerId=owner.ownerId where rental.customerId = ?";
        List<Rental> rentals=this.template.query(SQL,new RentalMapper(), customerId);
        return rentals;

    }
}
