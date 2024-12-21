"use client";

import { useState } from "react";
import { Container, Title, List, Bold, HideButton } from "./Description.styled";

interface BodyItemType {
  bold: boolean;
  text: string;
}

export interface DescriptionType {
  body: BodyItemType[];
  list?: BodyItemType[][];
}

export default function Description({
  title,
  body,
}: {
  title: string;
  body: DescriptionType[];
}) {
  const [view, setView] = useState(true);

  return (
    <Container>
      <Title>{title}</Title>
      {view ? (
        <List>
          {body.map((item, index) => (
            <li key={`description_${index.toString()}`}>
              <p>
                {item.body.map((itemBody, indexBody) => {
                  const key = `description_${index.toString()}_body_${indexBody.toString()}`;
                  if (itemBody.bold)
                    return <Bold key={key}>{itemBody.text}</Bold>;
                  return <span key={key}>{itemBody.text}</span>;
                })}
              </p>
              {item.list ? (
                <List>
                  {item.list.map((itemList, indexList) => (
                    <li
                      key={`description_${index.toString()}_list_${indexList.toString()}`}
                    >
                      {itemList.map((itemListBody, indexListBody) => {
                        const key = `description_${index.toString()}_list_${indexList.toString()}_${indexListBody.toString()}`;
                        if (itemListBody.bold)
                          return <Bold key={key}>{itemListBody.text}</Bold>;
                        return <span key={key}>{itemListBody.text}</span>;
                      })}
                    </li>
                  ))}
                </List>
              ) : null}
            </li>
          ))}
        </List>
      ) : null}
      <HideButton
        onClick={() => {
          setView((prev) => !prev);
        }}
      >
        안내사항 접기
      </HideButton>
    </Container>
  );
}
