package openerp.openerpresourceserver.service;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import openerp.openerpresourceserver.controller.entity.Order;
import openerp.openerpresourceserver.converter.OrderConverter;
import openerp.openerpresourceserver.dto.OrderDTO;
import openerp.openerpresourceserver.repo.OrderRepo;
import openerp.openerpresourceserver.response.OrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Log4j2
@AllArgsConstructor(onConstructor_ = @Autowired)
@Service
public class OrderServiceImpl implements OrderService{
    private OrderRepo orderRepo;
    private OrderConverter orderConverter;
    @Override
    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepo.findAll();
        List<OrderResponse> results = new ArrayList<>();
        for (Order order : orders) {
            results.add(orderConverter.toResponse(order));
        }
        return results;
    }

    @Override
    public Order addOrder(OrderDTO order) {
        Order newOrder = orderConverter.toOrder(order);
        return orderRepo.save(newOrder);
    }
}
