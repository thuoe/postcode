import * as React from "react";
import vscode from "../../vscode";
import { RequestMethodSelector } from "../../features/requestMethod/RequestMethodSelector";
import { RequestUrl } from "../../features/requestUrl/RequestUrl";
import { responseLoadingStarted } from "../../features/response/responseSlice";
import { selectRequestAuth } from "../../features/requestAuth/requestAuthSlice";
import { selectRequestBody } from "../../features/requestBody/requestBodySlice";
import { selectRequestHeaders } from "../../features/requestHeader/requestHeaderSlice";
import { selectRequestUrl } from "../../features/requestUrl/requestUrlSlice";
import { selectRequestMethod } from "../../features/requestMethod/requestMethodSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./styles.css";

export const RequestBar = () => {
  const dispatch = useAppDispatch();

  const requestMethod = useAppSelector(selectRequestMethod);
  const requestHeaders = useAppSelector(selectRequestHeaders);
  const requestBody = useAppSelector(selectRequestBody);
  const requestUrl = useAppSelector(selectRequestUrl);
  const requestAuth = useAppSelector(selectRequestAuth);

  return (
    <form
      className="request-bar"
      onSubmit={(e) => {
        dispatch(responseLoadingStarted());
        vscode.postMessage({
          method: requestMethod,
          auth: requestAuth,
          body: requestBody,
          headers: requestHeaders,
          url: requestUrl,
        });
        e.preventDefault();
      }}
    >
      <RequestMethodSelector />
      <RequestUrl />
      <button
        name="request-send"
        id="request-send"
        type="submit"
        className="button-request-send"
      >
        Send
      </button>
    </form>
  );
};
