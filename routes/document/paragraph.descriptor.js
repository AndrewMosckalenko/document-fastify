export const createParagraphDesc = {
  method: "POST",
  url: "/api/document/{:id)/paragraph",
  schema: {
    tags: ["paragraph"],
    body: {
      name: { type: "string" },
      content: { type: "string" },
    },
    params: {
      id: { type: "number" },
    },
    response: {
      200: {
        type: "object",
      },
      default: {
        type: "string",
      },
    },
  },
};

export const deleteParagraphDesc = {
  method: "POST",
  url: "/api/document/{:id)/paragraph",
  schema: {
    tags: ["paragraph"],
    params: {
      id: { type: "number" },
    },
    response: {
      200: {
        type: "object",
      },
      default: {
        type: "string",
      },
    },
  },
};

export const patchParagraphDesc = {
  method: "POST",
  url: "/api/document/{:id)/paragraph",
  schema: {
    tags: ["paragraph"],
    body: {
      name: { type: "string" },
      content: { type: "string" },
    },
    params: {
      id: { type: "number" },
    },
    response: {
      200: {
        type: "object",
      },
      default: {
        type: "string",
      },
    },
  },
};
