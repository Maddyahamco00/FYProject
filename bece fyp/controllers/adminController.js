module.exports = {
    dashboard: async (req, res) => {
      try {
        const [students] = await req.app.locals.pool.query('SELECT COUNT(*) AS count FROM students');
        const [schools] = await req.app.locals.pool.query('SELECT COUNT(*) AS count FROM schools');
        const [subjects] = await req.app.locals.pool.query('SELECT COUNT(*) AS count FROM subjects');
        const [results] = await req.app.locals.pool.query('SELECT COUNT(*) AS count FROM exam_results');
        
        res.render('admin/dashboard', {
          title: 'Dashboard',
          counts: {
            students: students[0].count,
            schools: schools[0].count,
            subjects: subjects[0].count,
            results: results[0].count
          }
        });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
    },
  
    students: async (req, res) => {
      try {
        const [students] = await req.app.locals.pool.query(`
          SELECT s.*, sc.school_name 
          FROM students s
          JOIN schools sc ON s.school_id = sc.school_id
          LIMIT 50
        `);
        
        const [schools] = await req.app.locals.pool.query('SELECT * FROM schools');
        
        res.render('admin/students', {
          title: 'Students',
          students,
          schools
        });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
    },
  
    schools: async (req, res) => {
      try {
        const [schools] = await req.app.locals.pool.query('SELECT * FROM schools');
        res.render('admin/schools', { title: 'Schools', schools });
      } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
      }
    },
  
    results: async (req, res) => {
      res.render('admin/results', { title: 'Results' });
    },
  
    profile: (req, res) => {
      res.render('admin/profile', { title: 'Profile', user: req.user });
    }
  };