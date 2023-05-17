"use strict";

import { NextApiRequest, NextApiResponse } from "next";
import ytdl from "ytdl-core";
import axios from "axios";

export default async function download(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = req.body.url as string;
    const itag = req.body.itag;

    // youtube
    if (url.split("/")[2] === "www.youtube.com") {
      const info = await ytdl.getInfo(url);
      const chooseFormat = ytdl.chooseFormat(info.formats, {
        quality: itag,
      });

      return res.status(200).json({ result: { url: chooseFormat.url } });
    }

    // instagram
    if (url.split("/")[2] === "www.instagram.com") {
      const igId = url.split("/")[4];
      const options = {
        method: "GET",
        url: "https://instagram-scraper-2022.p.rapidapi.com/ig/post_info/",
        params: {
          shortcode: igId,
        },
        headers: {
          "X-RapidAPI-Key":
            "d280df9834mshbccf37a598cb8a8p1952eejsn29939f952305",
          "X-RapidAPI-Host": "instagram-scraper-2022.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        return res.status(200).json({
          result: {
            thumbnail: response?.data?.thumbnail_src,
            title: response?.data?.owner?.full_name,
            url: response?.data?.video_url,
            format: [
              {
                qualityLabel: response?.data?.dimensions?.width,
              },
            ],
          },
        });
      } catch (error) {
        return res
          .status(402)
          .json({ message: "Something wrong, Please try again!" });
      }
    }

    // url not support
    return res.status(404).json({ message: "Url not support" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Something wrong, Please try again!" });
  }
}
