export const createTagDesc = {
  method: "POST",
  url: "/api/document/{:id)/tag",
  schema: {
    tags: ["tag"],
    body: {
      title: { type: "string" },
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

export const deleteTagDesc = {
  method: "DELETE",
  url: "/api/document/{:id)/tag",
  schema: {
    tags: ["tag"],
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
