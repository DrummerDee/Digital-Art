module.exports = editComment (req, res => {
    const { id, comment } = req.body;
    try {
      const result = commentCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: { comments: comment } }
      );
      console.log('comment edited')
      // res.statusCode = 200;
      res.send().json(result);
    } catch (err) {
      console.error(err);
    }
})