package com.telusko.quiz_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizResponse {
    private Integer quizId;
    private String title;
    private String categoryName;
    private Integer numQuestions;
    private List<QuestionWarraper> questions;
}


