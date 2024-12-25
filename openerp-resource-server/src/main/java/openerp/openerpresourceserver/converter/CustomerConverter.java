package openerp.openerpresourceserver.converter;

import openerp.openerpresourceserver.controller.entity.Customer;
import openerp.openerpresourceserver.dto.CustomerDTO;
import org.springframework.stereotype.Component;

@Component
public class CustomerConverter {
     public CustomerDTO convertToDTO(Customer customer) {
         return CustomerDTO.builder()
                 .id(customer.getId())
                 .name(customer.getName())
                 .status(customer.getStatus())
                 .address(customer.getAddress())
                 .build();
     }
     public Customer convertToEntity(CustomerDTO customerDTO) {
         return Customer.builder()
                 .id(customerDTO.getId())
                 .name(customerDTO.getName())
                 .status(customerDTO.getStatus())
                 .address(customerDTO.getAddress())
                 .build();
     }
}
