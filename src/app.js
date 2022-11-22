import express from "express";
import { Pool } from "pg";
import cred from "../credentials";
import buildRedisClient from "./redisClient";

const pool = new Pool({
  ...cred,
  host: "host.docker.internal" || "192.168.1.67",
});
const PORT = process.env.PORT || 3000;
const app = express();
const redis = buildRedisClient();

app.get("/", async (req, res, next) => {
  return res.status(200).json({
    ok: true,
    message: "There is a `/:limit` endpoint, maxLimit is 346",
    redisComanderUi: "http://localhost:5000",
  });
});

// get employees
app.get("/:limit", async (req, res, next) => {
  if (!req.params.limit) {
    return res.status(400).json({ error: true, reason: "specify limit" });
  }

  let query = `SELECT * FROM employees ORDER BY name ASC LIMIT ${req.params.limit}`;
  console.log({ path: req.path, params: req.params, query });
  try {
    const cachedData = await redis.get(query);
    if (cachedData) {
      return res.status(200).json({
        running: true,
        mode: "getting from redis",
        WhichServiceThisReqComesFrom:
          process.env.EXPOSED_PORT || "NOT SPECIFIED!",
        result: JSON.parse(cachedData).rows,
      });
    } else {
      const result = await pool.query(query);
      await redis.set(query, JSON.stringify(result), "EX", 120);
      return res.status(200).json({
        running: true,
        mode: "getting from database -> already stored in cache!",
        WhichServiceThisReqComesFrom:
          process.env.EXPOSED_PORT || "NOT SPECIFIED!",
        result: result.rows,
      });
    }
  } catch (error) {
    console.log("failed to get response!", error);
  }
});

app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
