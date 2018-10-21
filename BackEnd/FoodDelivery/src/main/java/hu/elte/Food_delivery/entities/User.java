package hu.elte.Food_delivery.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class User implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column
    @NotNull
    private String email;
    
    @Column
    @NotNull
    private String name;
    
    @Column
    @NotNull
    private String password;
    
    @Column
    @NotNull
    private Integer postCode;
    
    @Column
    @NotNull
    private String city;
    
    @Column
    @NotNull
    private String street;
    
    @Column
    @NotNull
    private String streetNumber;
    
    @Column
    private String phoneNumber;
    
    @OneToMany(mappedBy = "user")
    private List<Reservation> reservations;
    
    @OneToMany(mappedBy = "deliverer")
    private List<Reservation> reservationDelivery;
    
    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastLogin;
    
    @Column
    @Enumerated(EnumType.STRING)
    private Role role;
    
    public enum Role {
        ROLE_ADMIN,
        ROLE_DISPATCHER,
        ROLE_DELIVERER,
        ROLE_USER
    }
    
}
