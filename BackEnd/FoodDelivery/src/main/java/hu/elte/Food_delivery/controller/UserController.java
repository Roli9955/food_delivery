package hu.elte.Food_delivery.controller;

import hu.elte.Food_delivery.entities.Reservation;
import hu.elte.Food_delivery.entities.User;
import hu.elte.Food_delivery.repositories.ReservationRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import hu.elte.Food_delivery.repositories.UserRepository;
import java.util.List;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ReservationRepository reservationRepository;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    @GetMapping("")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<Iterable<User>> getAll(){
        Iterable<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
    
    @PostMapping("/register")
    @Secured({ "ROLE_GUEST" })
    public ResponseEntity<User> post(@RequestBody User user) {
        Optional<User> oUser = userRepository.findByEmail(user.getEmail());
        if (oUser.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        user.setId(null);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(User.Role.ROLE_USER);
        return ResponseEntity.ok(userRepository.save(user));
    }
    
    @GetMapping("/{id}")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER", "ROLE_DELIVERER", "ROLE_USER" })
    public ResponseEntity<User> get(@PathVariable Integer id){
        Optional<User> oUser = userRepository.findById(id);
        if(!oUser.isPresent()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(oUser.get());
    }
    
    @DeleteMapping("/{id}")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity delete(@PathVariable Integer id){
        Optional<User> oUser = userRepository.findById(id);
        if(!oUser.isPresent()){
            return ResponseEntity.notFound().build();
        }
        userRepository.delete(oUser.get());
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}")
    @Secured({ "ROLE_ADMIN" })
    public ResponseEntity<User> put(@PathVariable Integer id, 
                                        @RequestBody User user){
        Optional<User> oUser = userRepository.findById(id);
        if(!oUser.isPresent()){
            return ResponseEntity.notFound().build();
        }
        user.setId(id);
        return ResponseEntity.ok(userRepository.save(user));
    }
    
    @GetMapping("/{id}/reservations")
    public ResponseEntity<Iterable<Reservation>> getReservations(@PathVariable Integer id){
        Optional<User> oUser = userRepository.findById(id);
        if(!oUser.isPresent()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(oUser.get().getReservations());
    }
    
    @PutMapping("/{id}/reservations")
    @Secured({ "ROLE_ADMIN", "ROLE_DISPATCHER" })
    public ResponseEntity<Iterable<Reservation>> putReservations(@PathVariable Integer id,
                                                                 @RequestBody List<Reservation> reservations) {
        Optional<User> oUser = userRepository.findById(id);
        if (!oUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        for (Reservation reservation: reservations) {
            Optional<Reservation> oReservation  = reservationRepository.findById(reservation.getId());
            if (!oReservation.isPresent()) {
                continue;
            }
            
            oReservation.get().setDeliverer(oUser.get());
            reservationRepository.save(oReservation.get());
        }
        
        return ResponseEntity.ok(oUser.get().getReservationDelivery());
    }
    
}
