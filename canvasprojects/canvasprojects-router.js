const router = require("express").Router();
const CanvasProjects = require("./canvasprojects-model.js");
const cloudinary = require('cloudinary');

// GET Methods

router.get('/', async (req, res) => {
  try {
   const canvasprojects = await CanvasProjects.getAll();
   res.status(200).json(canvasprojects)
  } catch (err) {
   res.status(500).json(err)
  }
});

router.get('/:projectId', async (req, res) => {
   const { projectId } = req.params;
   try {
      const canvasprojectsByProjectId = await CanvasProjects.getById(projectId);
      res.status(200).json(canvasprojectsByProjectId)
   } catch (err) {
      res.status(500).json({ error: "Error retrieving project by Id"})
   }
})

router.get('/:projectId/tags', async (req, res) => {
   const { projectId } = req.params;
   try {
      const tagsbyProjectId = await CanvasProjects.getTagsByProjectId(projectId);
      res.status(200).json(tagsbyProjectId);
   } catch (err) {
      res.status(500).json(err)
   }
})

// Canvas Project - POST

router.post('/', async (req, res) => {
   const project = req.body;
   try {
      const newProject = await CanvasProjects.insert(project);
      res.status(201).json(newProject);
   } catch (err) {
      res.status(500).json({ error: "Error posting new project"})
   }
})

// Canvas Project - DELETE

// const deleteCloudinary = async publicId => {
//    //await cloudinary.v2.uploader.destroy(publicId)
//    try {
//       await cloudinary.v2.uploader.destroy(publicId)
//       console.log("worked")
//    } catch (err) {
//       console.log(err)
//    }
// }

router.delete('/:projectId', async (req, res) => {
   console.log(req.body.public_id)

   const { projectId } = req.params;
   try {
      const result = await CanvasProjects.remove(projectId);
      // console.log(result)
      // console.log(typeof result[0].public_id, result[0].public_id)
      await cloudinary.v2.uploader.destroy(result[0].public_id) // req.body NOT NEEDED - public_id already in result
      //deleteCloudinary(result[0].public_id);

      res.status(200).json({ message: `Project has been deleted! ${projectId}`})
      // if(result > 0) {
      //   await cloudinary.v2.uploader.destroy(req.body.public_id)
      //   res.status(200).json({ message: `Project has been deleted! ${projectId}`})
      // } else {
      //   res.status(404).json({ message: 'Project could not be found' })
      // }
   } catch(error) {
      res.status(500).json({message: "Error removing project"})
   }
})
// const result = await CanvasProjects.remove(projectId);
//break out cloudinary endpoint and call in the delete function. 
// My brain hurts...ty cloudinary... :'(
// Canvas Project - UPDATE

// test endpoint 
router.delete("/projectId/:id", async (req,res) => {
   console.log(req.body)
   try {
     const count = await CanvasProjects.remove(projectId);
     if(count > 0) {
       await cloudinary.v2.uploader.destroy(req.body.public_id)
       // await cloudinary.v2.uploader.destroy()
       res.status(200).json({ message: `Project has been deleted! ${req.params.id}` })
     } else {
       res.status(404).json({ message: 'Project could not be found' })
     }
   } catch(error) {
     res.status(500).json({
       message: "Error removing project"
     })
   }
 })


router.put('/:projectId', async (req, res) => {
   const { projectId } = req.params;
   const projectUpdate = req.body;

   try {
      const result = await CanvasProjects.update(projectId, projectUpdate);
      res.status(201).json(result);
   } catch (err) {
      res.status(500).json({error: "Error updating canvas project"})
   }
})

// Post Tags

router.post('/tags', async (req, res) => {
   const tag = req.body;
   try {
      const newTag = await CanvasProjects.insertTag(tag);
      res.status(201).json(newTag);
   } catch (err) {
      res.status(500).json({error: "Error posting tag"})
   }
})

module.exports = router;