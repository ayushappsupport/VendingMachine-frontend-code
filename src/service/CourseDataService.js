import axios from 'axios'

const INSTRUCTOR = 'in28minutes'
const COURSE_API_URL = 'http://localhost:8080'
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/machine/1/coins`

class CourseDataService {

    retrieveAllCourses(name) {
        //console.log('executed service')
        return axios.get(`${INSTRUCTOR_API_URL}/`);
    }

    retrieveCourse(name, id) {
        //console.log('executed service')
        return axios.post(`${INSTRUCTOR_API_URL}/addCoins/`, id);
    }

    deleteCourse(name, id) {
        //console.log('executed service')
        return axios.delete(`${INSTRUCTOR_API_URL}/courses/${id}`);
    }

    updateCourse(name, id) {
        //console.log('executed service')
        return axios.post(`${INSTRUCTOR_API_URL}/refund`, id);
    }

    createCourse(name, course) {
        //console.log('executed service')
        return axios.post(`${INSTRUCTOR_API_URL}/addInitialCoins/`, course);
    }
}

export default new CourseDataService()