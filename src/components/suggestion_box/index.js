import { useState } from "react";

import { Container, Response } from "./suggestion_box";
import { Button, Form, Spinner } from "react-bootstrap";

export default function Suggestion_Box() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(
    "Your TV suggestion will show up here."
  );

  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const onGenreSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const genreData = new FormData(e.target),
      genreDataObj = Object.fromEntries(genreData.entries());

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Suggest a ${genreDataObj.whichTV} in the ${genreDataObj.genre} genre:`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
    });
    setIsLoading(false);
    setResponse(response.data.choices[0].text);
  };

  return (
    <>
      <Container>
        <Form onSubmit={onGenreSubmit}>
          <Form.Group className="pb-3">
            <Form.Label className="input-title">Pick a genre</Form.Label>
            <Form.Select className="w-auto" name="genre">
              {[
                "Action",
                "Adventure",
                "Dark humor",
                "Drama",
                "Fairytale",
                "Fantasy",
                "Fiction",
                "Folklore",
                "Historical Fiction",
                "Horror",
                "Humor",
                "Mystery",
                "Mythology",
                "Nonfiction",
                "Poetry",
                "Romance",
                "Science Fiction",
                "Thriller",
              ].map((option, idx) => (
                <option key={idx}>{option}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="pb-3">
            <Form.Label className="input-title">
              Do you want a movie or a TV show?
            </Form.Label>
            <Form.Select className="w-auto" name="whichTV">
              {["Movie", "TV Show"].map((option, idx) => (
                <option key={idx}>{option}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button type="submit" value="submit">
            Get Suggestions{" "}
            {isLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                style={{ fontSize: "10px" }}
              />
            ) : null}
          </Button>
        </Form>
      </Container>
      <Response>{response}</Response>
    </>
  );
}
