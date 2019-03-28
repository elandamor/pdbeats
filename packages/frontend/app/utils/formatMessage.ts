const formatMessage = (operationType: any, operation: any, elapsed?: any) => {
  const headerCss = [
    "color: gray; font-weight: lighter", // title
    `color: ${operationType === "query" ? "#02B875" : "#03A9F4"};`, // operationType
    "color: #000;" // operationName
  ];

  const parts = ["%c apollo"];

  parts.push(`%c${operationType}`);
  parts.push(`%c${operation.operationName}`);

  if (elapsed) {
    parts.push(`%c(in ${elapsed} ms)`);
    headerCss.push("color: gray; font-weight: lighter;"); // time
  }

  return [parts.join(" "), ...headerCss];
};

export default formatMessage;
