package com.telusko.question_service.service;

import com.telusko.question_service.dao.QuestionDao;
import com.telusko.question_service.model.Question;
import com.telusko.question_service.model.QuestionWrapper;
import com.telusko.question_service.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionDao questionDao;

    public ResponseEntity<List<Question>> getAllQuestions() {
        try {
            List<Question> questions = questionDao.findAll();
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<Question>> getAllQuestionsByCategory(String category) {
        try {
            List<Question> questions = questionDao.getAllQuestionByCategory(category);
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<String> addQuestion(Question question) {
        try {
            Question savedQuestion = questionDao.save(question);

            return new ResponseEntity<>(
                    "Question added successfully with id: " + savedQuestion.getId(),
                    HttpStatus.CREATED
            );
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<Integer>> getQuestionForQuiz(
            String categoryName,
            Integer numQuestions) {

        List<Integer> questionIds =
                questionDao.findRandomQuestionByCategory(categoryName, numQuestions);

        return new ResponseEntity<>(questionIds, HttpStatus.OK);
    }

    public ResponseEntity<List<QuestionWrapper>>getQuestionsFromId(
            List<Integer>id) {

        List<QuestionWrapper> warrapers = new ArrayList<>();

        for (Integer ids : id) {
            Question question = questionDao.findById(ids).orElseThrow();

            QuestionWrapper wrapper = new QuestionWrapper();
            wrapper.setId(question.getId());
            wrapper.setQuestionTitle(question.getQuestionTitle());
            wrapper.setOption1(question.getOption1());
            wrapper.setOption2(question.getOption2());
            wrapper.setOption3(question.getOption3());
            wrapper.setOption4(question.getOption4());

            warrapers.add(wrapper);
        }

        return new ResponseEntity<>(warrapers, HttpStatus.OK);
    }

    public ResponseEntity<Integer> getScore(List<Response> response) {
        int right = 0;
        for(Response r : response) {
            Question question = questionDao.findById(r.getId()).get();
            if(r.getResponse().equals(question.getRightAnswer()))
                right++;
        }
        return new ResponseEntity<>(right, HttpStatus.OK);
    }
    //generate
    //getQuestion
    //getScore
}
