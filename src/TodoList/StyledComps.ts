import styled from "styled-components";

export const Header = styled.div`
  border: 1px;
  background-color: lightcyan;
  font-weight: bolder;
  position: fixed;
  top: 0;
  width: 100%;
  height: 30px; /* Height of the header */
  background: #6cf;
`;

export const StyledInput = styled.input`
  margin-top: 15px;
  width: 50%;
  height: 32px;
`;

export const StyledSubmitBtn = styled.button`
  width: 18%;
  height: 38px;
  background-color: aliceblue;
`;

export const StyledFooter = styled.div`
  border: 1px;
  background-color: lightcyan;
  font-weight: bolder;
  position: fixed;
  bottom: 0;
  width: 99%;
  height: 25px; /* Height of the footer */
  background: #6cf;
`;

export const TodoCard = styled.div`
  border: 1px;
  background-color: aliceblue;
  width: 18.95%;
  float: left;
  height: 200px;
  margin: 10px;
  border-radius: 10px;
`;

export const TodoTitle = styled.div`
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 20px;
  margin: 10px;
  text-align: center;
`;

export const TodoStatus = styled.div`
  font-size: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 2px;
  text-align: center;
`;

export const MarkDone = styled.button`
  /* left: 90px; */
  width: 90px;
  position: relative;
`;

export const StyledBtn = styled.button`
  position: relative;
  width: 150px;
  height: 40px;
  margin-top: 1.3%;
`;
