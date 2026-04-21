package com.telusko.quiz_service.service;

import com.telusko.quiz_service.dao.QuizDao;
import com.telusko.quiz_service.feign.QuizInterface;
import com.telusko.quiz_service.model.QuestionWarraper;
import com.telusko.quiz_service.model.Quiz;
import com.telusko.quiz_service.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    QuizDao quizDao;

    @Autowired
    QuizInterface quizInterface;

    public ResponseEntity<com.telusko.quiz_service.model.QuizResponse> create(String category, int numQ, String title) {

        List<Integer> questionsIds = quizInterface.getQuestionForQuiz(category, numQ).getBody();
        System.out.println(questionsIds);
        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestionsIds(questionsIds);
        Quiz savedQuiz = quizDao.save(quiz);

        // Get the actual questions
        ResponseEntity<List<QuestionWarraper>> questionsResponse = quizInterface.getQuestionsFromId(questionsIds);
        List<QuestionWarraper> questions = questionsResponse.getBody();

        com.telusko.quiz_service.model.QuizResponse quizResponse = new com.telusko.quiz_service.model.QuizResponse();
        quizResponse.setQuizId(savedQuiz.getId());
        quizResponse.setTitle(savedQuiz.getTitle());
        quizResponse.setCategoryName(category);
        quizResponse.setNumQuestions(numQ);
        quizResponse.setQuestions(questions);

        return new ResponseEntity<>(quizResponse, HttpStatus.CREATED);

    }


    public ResponseEntity<List<QuestionWarraper>> getQuizQuestions(Integer id) {
        Quiz quiz = quizDao.findById(id).get();
        List<Integer> questionIds = quiz.getQuestionsIds();
        ResponseEntity<List<QuestionWarraper>> questions = quizInterface.getQuestionsFromId(questionIds);
        return questions;
    }

    public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {
        ResponseEntity<Integer> score = quizInterface.getScore(responses);
     return score;
    }
}

