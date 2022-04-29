import React from 'react'
import {Link} from 'react-router-dom'


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.repo_link}
            </td>
            <td>
                <button onClick={()=>deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}


const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <table>
                <th>
                    Projectname
                </th>
                <th>
                    Repository
                </th>
                <th></th>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectList