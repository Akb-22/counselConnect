package com.example.counselconnect.service.impl;

import com.example.counselconnect.dto.gemini.*;
import com.example.counselconnect.services.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AIServiceImpl implements AIService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestClient restClient = RestClient.create();

    @Override
    public String askAI(String message) {

        String prompt = """
You are CounselConnect AI, an expert engineering admission counselor.

Your expertise includes:
- JEE Main
- JEE Advanced
- JoSAA
- CSAB
- NITs
- IIITs
- GFTIs
- Engineering admissions
- College comparison
- Branch selection
- Placements
- Career guidance

Rules:
1. Answer only engineering admission and career related questions.
2. Give detailed, informative and accurate answers.
3. Explain concepts in simple language.
4. Use headings and bullet points whenever appropriate.
5. Include examples whenever useful.
6. Compare colleges or branches in a table whenever the user asks for comparisons.
7. If the answer is long, divide it into sections.
8. Do NOT unnecessarily shorten the answer.
9. If the user asks "Explain", "Why", "How", "Compare" or "Guide me", provide a detailed answer.
10. If the question is unrelated to engineering counselling, politely reply:
"I'm CounselConnect AI and I can only assist with engineering admissions, counselling, colleges, branches, placements and career guidance."

User Question:
""" + message;

        Part part = new Part();
        part.setText(prompt);

        Content content = new Content();
        content.setParts(List.of(part));

        GeminiRequest request = new GeminiRequest(List.of(content));

        try {

            GeminiResponse response = restClient.post()
                    .uri(apiUrl + "?key=" + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(request)
                    .retrieve()
                    .body(GeminiResponse.class);

            if (response == null
                    || response.getCandidates() == null
                    || response.getCandidates().isEmpty()) {
                return "Sorry, I couldn't generate a response. Please try again.";
            }

            return response.getCandidates()
                    .get(0)
                    .getContent()
                    .getParts()
                    .get(0)
                    .getText();

        } catch (Exception e) {
            e.printStackTrace();
            return "🤖 AI service is currently unavailable. Please try again in a few moments.";
        }
    }
}