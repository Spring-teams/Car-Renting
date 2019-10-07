package net.springteam.CarRenting.dao;

import net.springteam.CarRenting.model.Owner;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AdminMapper implements RowMapper<Owner> {
    public Owner mapRow(ResultSet rs, int numRow) throws SQLException{
        Owner owner= new Owner();
        owner.setOwnerId(rs.getString("ownerId"));
        owner.setOwnerEmail(rs.getString("email"));
        owner.setOwnerName(rs.getString("ownerName"));
        owner.setCompanyName(rs.getString("companyName"));
        owner.setOwnerPass("unknown");
        return owner;
    }
}
