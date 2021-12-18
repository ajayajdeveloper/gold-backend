export async function getPriceById(client, id) {
  const result = await client
    .db("goldRate")
    .collection("price")
    .findOne({ id: id });
  console.log("connected", result);
  return result;
}
export async function deletePriceById(client, id) {
  const result = await client
    .db("goldRate")
    .collection("price")
    .deleteOne({ id: id });
  console.log("connected", result);
  return result;
}
export async function getPrice(client, filter) {
  const result = await client
    .db("goldRate")
    .collection("price")
    .find(filter)
    .toArray();
  console.log("connected", result);
  return result;
}
export async function insertPrice(client, price) {
  const result = await client
    .db("goldRate")
    .collection("price")
    .insertMany(price);
  console.log("connected succesfully", result);
  return result;

}

export async function insertUser(client, user) {
  const result = await client
    .db("goldRate")
    .collection("user")
    .insertOne(user);
  console.log("connected succesfully", result);
  return result;

}

export async function getUsers(client, filter) {
  const result = await client
    .db("goldRate")
    .collection("user")
    .find(filter)
    .toArray();
  console.log("connected", result);
  return result;
}

export async function getUser(client, filter) {
  const result = await client
    .db("goldRate")
    .collection("user")
    .findOne(filter)
  console.log("connected", result);
  return result;

}

export async function updatePriceById(client, id, newprice) {
  const result = await client
  .db("goldRate")
  .collection("price")
  .updateOne({ id: id },{$set:newprice});
console.log("connected", result);
return result;

}

export async function replacePriceById(client, id, newprice) {
  const result = await client
  .db("goldRate")
  .collection("price")
  .replaceOne({ id: id },newprice);
console.log("connected", result);
return result;

}

