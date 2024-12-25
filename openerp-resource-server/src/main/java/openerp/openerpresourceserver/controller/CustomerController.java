package openerp.openerpresourceserver.controller;

import lombok.AllArgsConstructor;
import openerp.openerpresourceserver.controller.entity.Customer;
import openerp.openerpresourceserver.controller.entity.User;
import openerp.openerpresourceserver.dto.CustomerDTO;
import openerp.openerpresourceserver.service.CustomerService;
import openerp.openerpresourceserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor(onConstructor_ = @Autowired)
@RequestMapping("/customer")

public class CustomerController {
    private CustomerService customerService;
    @GetMapping("/get-all")
    public ResponseEntity<?> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        return ResponseEntity.ok().body(customers);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCustomer(@RequestBody CustomerDTO customer, JwtAuthenticationToken token) {
        Customer newCustomer = customerService.addCustomer(customer,token);
        return ResponseEntity.ok().body(newCustomer);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable String id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok().body("Customer deleted successfully");
    }
}
