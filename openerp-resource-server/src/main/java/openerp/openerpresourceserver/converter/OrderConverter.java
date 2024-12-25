package openerp.openerpresourceserver.converter;

import lombok.AllArgsConstructor;
import openerp.openerpresourceserver.controller.entity.Order;
import openerp.openerpresourceserver.dto.OrderDTO;
import openerp.openerpresourceserver.response.OrderResponse;
import openerp.openerpresourceserver.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor(onConstructor_ = @Autowired)
public class OrderConverter {
    private final CustomerService customerService;

    public Order toOrder(OrderDTO orderDTO) {
        return Order.builder()
                .id(orderDTO.getId())
                .customer(customerService.getCustomerById(orderDTO.getCustomerId()))
                .status(orderDTO.getStatus())
                .weight(orderDTO.getWeight())
                .volumn(orderDTO.getVolumn())
                .build();
    }

    public OrderResponse toResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .customerId(order.getCustomer().getId())
                .customerName(order.getCustomer().getName())
                .status(order.getStatus())
                .weight(order.getWeight())
                .volumn(order.getVolumn())
                .build();
    }
}
