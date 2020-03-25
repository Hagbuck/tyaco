# How does the tests cases work ?

The test cases are written with *python 3.8*

# How to launch the test case ?

## Step 1 : Prepare your virtualenv

To ensure that you will install and use a specific environment dedicated for the Tyaco tests suit, we will used python's **virtualenv**.

```shell
# Creation of the virtualenv
python -m venv tyaco-tests-env

# Activation of the virtualenv
source tyaco-tests-env/bin/activate

# Download dependencies
pip install -r requirements.txt
```

Now your environment is ready

## Step 2 : Launch the whole tests

```shell
python tests.py
```
