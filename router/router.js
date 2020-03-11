const express = require("express");

const db = require("../data/db.js");

const router = express.Router();


router.post("/", (req,res) => {
    if (!req.body.title ) {
        res.status(400).json({
            error: "Please add a title"
        });
    } else {
        db.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "error saving bro"
            })
        })
    }
});

router.get("/", (req, res) => {
    db.find(req.query)
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "The info could not be found."
        });
      });
});

router.get("/:id", (req, res) => {
    db.findById(req.params.id)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({
            message: "ID does not exist."
          });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "could not be retrieved."
        });
    });
});
  
router.get("/:id/comments", (req, res) => {
    db.findPostComments(req.params.id)
      .then(com => {
        if (com) {
          res.status(200).json(com);
        } else {
          res.status(404).json({
            message: "ID does not exist."
          });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "could not be retrieved."
        });
      });
});

router.put("/:id", (req, res) => {
    db.update(req.params.id, req.body)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else if (!req.body.title || !req.body.contents) {
          res.status(400).json({
            errorMessage: "contents for the post."
          });
        } else {
          res
            .status(404)
            .json({ message: " ID does not exist." });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "could not be modified."
        });
      });
  });

router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
      .then(item => {
        if (item) {
          res.status(200).json(item);
        } else {
          res.status(404).json({
            message: "ID does not exist."
          });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "could not be removed"
        });
      });
  });
  










module.exports = router;