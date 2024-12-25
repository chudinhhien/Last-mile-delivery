package openerp.openerpresourceserver.controller;

import lombok.AllArgsConstructor;
import openerp.openerpresourceserver.controller.entity.Order;
import openerp.openerpresourceserver.dto.OrderDTO;
import openerp.openerpresourceserver.response.OrderResponse;
import openerp.openerpresourceserver.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor(onConstructor_ = @Autowired)
@RequestMapping("/order")
public class OrderController {
    private OrderService orderService;
    @GetMapping("/get-all")
    public ResponseEntity<?> getAllOrders() {
        List<OrderResponse> orders = orderService.getAllOrders();
        return ResponseEntity.ok().body(orders);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addOrder(@RequestBody OrderDTO order) {
        Order newOrder = orderService.addOrder(order);
        return ResponseEntity.ok().body(newOrder);
    }
}
