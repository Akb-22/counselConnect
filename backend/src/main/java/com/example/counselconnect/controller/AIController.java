package com.example.counselconnect.controller;


import com.example.counselconnect.dto.AIRequest;
import com.example.counselconnect.dto.AIResponse;
import com.example.counselconnect.services.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AIController {

    private final AIService aiService;

    @PostMapping("/chat")
    public AIResponse chat(@RequestBody AIRequest request) {

        String reply = aiService.askAI(request.getMessage());

        return new AIResponse(reply);
    }
}