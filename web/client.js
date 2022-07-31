import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "4us2f7vp",
  dataset: "production",
  useCdn: false,
  apiVersion: "2022-01-31",
  token:
    "skerhRbxiu2Hv1p1ontTQbNdOoJpqhUrdEPwihpW9KKIU7Eq1xZUileRr2EvUX7XE9ZGcJVcHW7fRJHaNXQYq2YeSr6A88OansFKvKORrX7xGg26nw22Dmw683aV46cMniEvYEZKtRI490MjZxemnWGNVOI3NizKu9nnHkI9XmWKwLbksmUy",
});

export default client;
