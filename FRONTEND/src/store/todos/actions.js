const URL = "http://localhost:3000";
//
export default {
  async loadTodos(context) {
    // GET USER TOKEN
    const token = context.rootGetters.token;
    console.log('token is:',token)
    // FETCH DATA FROM SERVER
    const res = await fetch(`${URL}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    // SET THE FETCHED ARRAY IN THE STORE
    console.log("Loading Data", result.todos);
    context.commit("setTodos", { todos: result.todos });
  },

  async addNewTodo(context, payload) {
    // GET USER TOKEN
    const token = context.rootGetters.token;

    const addedAt = new Date().toISOString();

    // SEND REQUEST TO ADD ITEM
    const res = await fetch(`${URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: payload.text,
        addedAt,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to save todo");
    }

    const result = await res.json();
    // ADD ITEM LOCALY
    context.commit("addTodo", {
      _id: result._id,
      text: result.text,
      addedAt,
    });
  },

  async updateStatus(context, payload) {
    // GET USER TOKEN
    const token = context.rootGetters.token;

    const updatedAt = new Date().toISOString();

    // SEND REQUEST TO UPDATE ITEM
    const res = await fetch(`${URL}/todos`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: payload.id,
        completed: payload.isCompleted,
        updatedAt, // If its incompletd ignore this
      }),
    });

    if (!res.ok) {
      console.log(res);
      throw new Error("Failed to save todo");
    }
    // UPDATE LOCALY
    context.commit("updateStatus", {
      ...payload,
      updatedAt,
    });
  },

  // NEW TODO DIALOG
  setDialogState(context, payload) {
    context.commit("setDialogState", payload);
  },
};
